## Team A:
## Encrytion Test: 

## Create New Key Pair for Entity:
•	Method: POST
•	URL: http://localhost:4000/api/keys/model/auth/entity/account1
•	Status: Success create an entityId for account


## Test Get Public Key for Entity:
  •	Method: GET
  •	URL: http://localhost:4000/api/keys/model/auth/entity/account1
  •	Status: Success get a public key

## Test Get Private Key for Entity:
  Method: GET
  URL: http://localhost:4000/api/keys/model/auth/entity/account1/private
  Status: Success get a PRIVATE KEY

## Test_Delete_Key_Pair:
  Method: DELETE
  URL: http://localhost:4000/api/keys/model/auth/entity/account1
  Status: Success delete the keys

## Test_Update_Key_Pair:
  Method: PUT
  URL: http://localhost:4000/api/keys/model/auth/entity/account1
  Status: Success update the keys
  
## Test_Encrypt_JWS:
  Method: POST
  URL: http://localhost:4000/api/jws/encrypt
  Status: Success encryption 
•	Data: 
{
  "jws": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "entityId": "player2"
}
•	Result:    { "encryptedToken": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAiLCJraWQiOiJlU0liTnM2VnBwa0J6S0E4cDh0Y3d0RjktS2hnWC1ONGJZaEpOLTZ6dFNVIn0.Q1-zqE0p1AR8V0A93lhnMfFGvGhcDhEhYTAo7HvUrKePQrCL_bVBdDFb-dulcW65y_B_ET4sbWnmEMKcvDxbptOptokLqEPYf9aODoMq3GdfI-YRTmyiFGTKFtzETcV4wH7QzGnPA1uyI_gw-jwIw3lQeUEQoj6v9vRoScmc-KV3W6YZ8AUDpXhhKj4GygTWGUI8qir4o5VrUHXGSXBaTlfevQYZw01PHXmTnwFQdJOo4WWMEJLwQ5TUPA7tooiqBNInBTQqstMv7HtHScM3zQZc--lWF_Mz5r0otgfioEdltuMb7qjDc8IgBGmpDOsq7l2dlhxObrE22QH6Yunqdg.-ixHjsApLsw9pGlaD6casQ.-ihFb7E0yMfQnchWMWzqGULAtT8q4KhEjXroA4zulGduTTLbpbFm9ptZ3aYjlm2Q7EUnshg9gpiI_aFdhNM-1WGfVTRIMB18DbUyTROtasa7SZUUJ-m3kbGqcGhzYh2WeH5ockmjN4MUEzMKhjGdVf7Thx1DbALxZ5XaGxJD358zxwjp3vZGu94ioQG3qxF7kGIfTwxwzb5fdgktDeNt1w.Cqzbo-eXO33dPX9aapditg",}

## Test_Decrypt_JWE:
  Method: GET
  URL: http://localhost:4000/api/jws/decrypt 
  Status: Success decryption
  Data: 
    encryptedToken: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAiLCJraWQiOiJlU0liTnM2VnBwa0J6S0E4cDh0Y3d0RjktS2hnWC1ONGJZaEpOLTZ6dFNVIn0.Q1-zqE0p1AR8V0A93lhnMfFGvGhcDhEhYTAo7HvUrKePQrCL_bVBdDFb-dulcW65y_B_ET4sbWnmEMKcvDxbptOptokLqEPYf9aODoMq3GdfI-YRTmyiFGTKFtzETcV4wH7QzGnPA1uyI_gw-jwIw3lQeUEQoj6v9vRoScmc-KV3W6YZ8AUDpXhhKj4GygTWGUI8qir4o5VrUHXGSXBaTlfevQYZw01PHXmTnwFQdJOo4WWMEJLwQ5TUPA7tooiqBNInBTQqstMv7HtHScM3zQZc--lWF_Mz5r0otgfioEdltuMb7qjDc8IgBGmpDOsq7l2dlhxObrE22QH6Yunqdg.-ixHjsApLsw9pGlaD6casQ.-ihFb7E0yMfQnchWMWzqGULAtT8q4KhEjXroA4zulGduTTLbpbFm9ptZ3aYjlm2Q7EUnshg9gpiI_aFdhNM-1WGfVTRIMB18DbUyTROtasa7SZUUJ-m3kbGqcGhzYh2WeH5ockmjN4MUEzMKhjGdVf7Thx1DbALxZ5XaGxJD358zxwjp3vZGu94ioQG3qxF7kGIfTwxwzb5fdgktDeNt1w.Cqzbo-eXO33dPX9aapditg"
    entityId: "player2"
  Result: 
    jws: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
## Test_Decrypt_Auth_JWE:
  Method: GET
  URL: http://localhost:4000/api/keys/decrypt/model/auth/entity/1111
  Status: Success
## Test_Encrypt_Auth_JWE:
  Method: POST
  URL: http://localhost:4000/api/keys/encrypt/model/auth/entity/1111
  Status: Success


