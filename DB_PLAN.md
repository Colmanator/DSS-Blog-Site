

## USERS

### email
- **varchar**
- Primary Key

### display_name
- **varchar**
- not nullable

### premium_status
- **boolean**
- not nullable

### password
- **varchar**
- not nullable
### salt
- **varchar**
- not nullable

### card_number
- **varchar**
### card_csv
- **varchar** 
### card_expiration 
- **varchar**

---
## POSTS
### ID
- **integer**
- Primary Key
### title
- **varchar**
- not nullable
### author
- foreign key
- - references email in USERS
- - on delete cascade
- not nullable
### summary
- **varchar**
### rating
- **numeric**
- not nullable
### premium_content
- **boolean**
- not nullable
### ingredients
- **varchar**
- not nullable
### instructions
- **varchar**
- not nullable

---
## REVIEWS
### ID
- **integer**
- Primary Key

### author
- integer
- foreign key
- - references email in USERS
- - on delete cascade
- not nullable

### post
- integer
- foreign key
- - references ID in POSTS
- - on delete cascade
- not nullable

### rating
- **integer**
- constrained between 1 and 5
- not nullable

### comment
- **varchar**