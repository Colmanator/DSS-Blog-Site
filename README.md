# DSS-Blog-Site

## Minimum
- Mitigate account enumeration
- Mitigate session hijacking
- Mitigate SQLi
- Mitigate XSS
- Mitigate XSRF


- Registration
- Login Auth
- Search Functionality
- Add Posts
- Edit Posts
- Delete Posts


- Password Hashing/Salting
- Encryption
- 
## Bonus
- Paywalling via Stripe or equivalent
- Comments and reviews

## Mitigations
- Account enum on signup - claim to have sent email to specified email, do not confirm whether or not account is already registered, have email provide a link to other half of signup process

# Progress (Backend)
## Work Done 
- Registration works properly, with no salting or security measures
- Session Pruning

## Left Unfinished
- session_id is left temporarily set to email_in value - terrible security!!!
- hashing implemented but not yet incorporated into userController methods