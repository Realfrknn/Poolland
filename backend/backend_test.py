#!/usr/bin/env python3
"""
Backend API Tests for DERINER Water Well Drilling Company
Tests all endpoints using the public preview URL
"""
import requests
import sys
from datetime import datetime

class DERINERAPITester:
    def __init__(self, base_url="https://deriner-premium.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_fn=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n{'='*60}")
        print(f"🔍 Test {self.tests_run}: {name}")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            print(f"   Status: {response.status_code} (expected: {expected_status})")
            
            # Check status code
            status_match = response.status_code == expected_status
            
            # Validate response if function provided
            validation_passed = True
            validation_msg = ""
            if validate_fn and status_match:
                try:
                    response_data = response.json()
                    validation_passed, validation_msg = validate_fn(response_data)
                except Exception as e:
                    validation_passed = False
                    validation_msg = f"Validation error: {str(e)}"
            
            success = status_match and validation_passed
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED")
                if validation_msg:
                    print(f"   {validation_msg}")
            else:
                print(f"❌ FAILED")
                if not status_match:
                    print(f"   Expected status {expected_status}, got {response.status_code}")
                if not validation_passed:
                    print(f"   {validation_msg}")
                try:
                    print(f"   Response: {response.text[:200]}")
                except:
                    pass
                self.failed_tests.append({
                    "name": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "message": validation_msg if not validation_passed else "Status mismatch"
                })

            return success, response.json() if response.status_code < 500 else {}

        except requests.exceptions.Timeout:
            print(f"❌ FAILED - Request timeout")
            self.failed_tests.append({"name": name, "endpoint": endpoint, "message": "Timeout"})
            return False, {}
        except requests.exceptions.ConnectionError as e:
            print(f"❌ FAILED - Connection error: {str(e)}")
            self.failed_tests.append({"name": name, "endpoint": endpoint, "message": f"Connection error: {str(e)}"})
            return False, {}
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            self.failed_tests.append({"name": name, "endpoint": endpoint, "message": str(e)})
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ returns {message:'DERINER API', status:'ok'}"""
        def validate(data):
            if data.get("message") == "DERINER API" and data.get("status") == "ok":
                return True, "Root endpoint response valid"
            return False, f"Invalid response: {data}"
        
        return self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200,
            validate_fn=validate
        )

    def test_health_endpoint(self):
        """Test GET /api/health returns {status:'ok', db:'connected'}"""
        def validate(data):
            if data.get("status") == "ok" and data.get("db") == "connected":
                return True, "Health check passed, DB connected"
            return False, f"Health check failed: {data}"
        
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200,
            validate_fn=validate
        )

    def test_services_endpoint(self):
        """Test GET /api/services returns list of 6 services"""
        def validate(data):
            if not isinstance(data, list):
                return False, f"Expected list, got {type(data)}"
            if len(data) != 6:
                return False, f"Expected 6 services, got {len(data)}"
            
            # Check required fields
            required_fields = ["slug", "title", "short", "highlights"]
            for i, service in enumerate(data):
                for field in required_fields:
                    if field not in service:
                        return False, f"Service {i} missing field: {field}"
            
            # Check specific slugs
            expected_slugs = [
                "yatay-sondaj", "kuyu-derinlestirme", "kuyu-guclendirme",
                "kuyu-temizleme", "su-kuyusu-acma", "tuvalet-kuyusu-kanal"
            ]
            actual_slugs = [s.get("slug") for s in data]
            for slug in expected_slugs:
                if slug not in actual_slugs:
                    return False, f"Missing expected service slug: {slug}"
            
            return True, f"All 6 services present with correct structure"
        
        return self.run_test(
            "Services List",
            "GET",
            "services",
            200,
            validate_fn=validate
        )

    def test_contact_submission_success(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "phone": "+905338636264",
            "email": "test@example.com",
            "service": "Yatay Sondaj",
            "message": "Test message for API validation"
        }
        
        def validate(data):
            if "id" not in data:
                return False, "Response missing 'id' field"
            if "created_at" not in data:
                return False, "Response missing 'created_at' field"
            if data.get("name") != test_data["name"]:
                return False, f"Name mismatch: {data.get('name')} != {test_data['name']}"
            return True, f"Contact submission successful, ID: {data.get('id')}"
        
        return self.run_test(
            "Contact Submission (Valid)",
            "POST",
            "contact",
            200,
            data=test_data,
            validate_fn=validate
        )

    def test_contact_honeypot_rejection(self):
        """Test POST /api/contact rejects when honeypot 'website' field is filled"""
        test_data = {
            "name": "Bot User",
            "phone": "+905338636264",
            "message": "This is a bot",
            "website": "http://spam.com"  # Honeypot field
        }
        
        return self.run_test(
            "Contact Honeypot Rejection",
            "POST",
            "contact",
            400,
            data=test_data
        )

    def test_contact_missing_fields(self):
        """Test POST /api/contact rejects when missing required fields"""
        test_data = {
            "name": "Incomplete User"
            # Missing phone and message
        }
        
        return self.run_test(
            "Contact Missing Required Fields",
            "POST",
            "contact",
            422,
            data=test_data
        )

    def test_contact_list(self):
        """Test GET /api/contact returns list of submissions"""
        def validate(data):
            if not isinstance(data, list):
                return False, f"Expected list, got {type(data)}"
            # Should have at least the submission we just made
            if len(data) == 0:
                return False, "No contact submissions found (expected at least 1 from previous test)"
            # Check first item has required fields
            if len(data) > 0:
                first = data[0]
                required = ["id", "name", "phone", "message", "created_at"]
                for field in required:
                    if field not in first:
                        return False, f"Contact record missing field: {field}"
            return True, f"Contact list retrieved: {len(data)} submissions"
        
        return self.run_test(
            "Contact List Retrieval",
            "GET",
            "contact",
            200,
            validate_fn=validate
        )

    def test_legacy_status_post(self):
        """Test POST /api/status (legacy endpoint)"""
        test_data = {
            "client_name": f"TestClient_{datetime.now().strftime('%H%M%S')}"
        }
        
        def validate(data):
            if "id" not in data:
                return False, "Response missing 'id' field"
            if "timestamp" not in data:
                return False, "Response missing 'timestamp' field"
            return True, "Legacy status POST working"
        
        return self.run_test(
            "Legacy Status POST",
            "POST",
            "status",
            200,
            data=test_data,
            validate_fn=validate
        )

    def test_legacy_status_get(self):
        """Test GET /api/status (legacy endpoint)"""
        def validate(data):
            if not isinstance(data, list):
                return False, f"Expected list, got {type(data)}"
            return True, f"Legacy status GET working: {len(data)} records"
        
        return self.run_test(
            "Legacy Status GET",
            "GET",
            "status",
            200,
            validate_fn=validate
        )

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print(f"📊 TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed} ✅")
        print(f"Failed: {len(self.failed_tests)} ❌")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print(f"\n{'='*60}")
            print(f"FAILED TESTS:")
            print(f"{'='*60}")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"{i}. {test['name']}")
                print(f"   Endpoint: {test.get('endpoint', 'N/A')}")
                print(f"   Message: {test.get('message', 'N/A')}")
        
        print(f"{'='*60}\n")
        
        return len(self.failed_tests) == 0


def main():
    print("="*60)
    print("DERINER API Backend Testing")
    print("="*60)
    print(f"Base URL: https://deriner-premium.preview.emergentagent.com/api")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)
    
    tester = DERINERAPITester()
    
    # Run all tests in order
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    tester.test_services_endpoint()
    tester.test_contact_submission_success()
    tester.test_contact_honeypot_rejection()
    tester.test_contact_missing_fields()
    tester.test_contact_list()
    tester.test_legacy_status_post()
    tester.test_legacy_status_get()
    
    # Print summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
