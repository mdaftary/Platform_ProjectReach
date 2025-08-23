# Authentication Quick Reference

## 🚀 Quick Testing Guide

### Test Credentials

| Type | Identifier | Password | Role |
|------|------------|----------|------|
| Username | `testuser` | `test123` | parent |
| Email | `test@example.com` | `test123` | parent |
| Phone | `12345678` | `phone123` | parent |
| Volunteer | `volunteer_user` | `volunteer123` | volunteer |
| Admin | `admin_user` | `admin123` | admin |

### Test Values

- **Verification Code**: `0000` (always works)
- **School Code**: `SCHOOL123` (valid code)
- **Phone Format**: 8 digits only (e.g., `12345678`)

## 🔍 Debug Commands

### Browser Console

```javascript
// View all registered users (including new signups)
JSON.parse(localStorage.getItem('mock_users'))

// View current logged-in user
JSON.parse(localStorage.getItem('auth_user'))

// View auth token
localStorage.getItem('auth_token')

// Clear all data (reset to defaults)
localStorage.clear(); location.reload()
```

### Console Log Prefixes

- `🔍 [AUTH]` - Data loading/saving
- `🔐 [LOGIN]` - Login process
- `📝 [SIGNUP]` - Signup process  
- `🔐 [VERIFICATION]` - Code verification
- `🚪 [LOGOUT]` - Logout process

## 📱 Flow Testing

### Login Flows

**Username Login:**
1. Go to `/login`
2. Enter `testuser` 
3. Password field appears
4. Enter `test123`
5. Click "Sign In"

**Phone/Email Login:**
1. Go to `/login`
2. Enter `test@example.com` or `12345678`
3. Click "Next" (no password field)
4. Redirected to verification
5. Enter code `0000`
6. Auto-logged in

### Signup Flows

**New User Signup:**
1. Go to `/signup`
2. Enter new email/phone/username
3. Follow verification (if phone/email)
4. Choose Parent or Volunteer role
5. Fill required details
6. Account created

**Existing User Signup:**
1. Enter existing credentials
2. System detects user exists
3. Redirected to login or password entry

## 🏗️ Data Structure

### User Object
```javascript
{
  id: "user_1234567890",
  username: "testuser", 
  email: "test@example.com",
  phone: undefined,
  role: "parent",
  studentName: "Child Name",    // parents only
  parentName: "Parent Name",    // parents only  
  school: "School Name",        // parents only
  createdAt: "2024-11-01T..."
}
```

### Stored Users Array
```javascript
[
  {
    // User object + password field
    password: "test123"
  },
  // ... more users
]
```

## 🛠️ Development Tips

### Adding New Test Users

```javascript
// In browser console after signup:
const users = JSON.parse(localStorage.getItem('mock_users'))
console.log('Total users:', users.length)
console.log('Latest user:', users[users.length - 1])
```

### Debugging Failed Login

1. Check console logs for detailed flow
2. Verify user exists in stored users
3. Check password matches
4. Ensure correct input type detection

### Debugging Signup Issues

1. Monitor console for conflict detection
2. Check localStorage space availability
3. Verify input format detection
4. Confirm verification code entry

### Reset Everything

```javascript
// Nuclear option - clear everything
localStorage.clear()
sessionStorage.clear()
location.reload()
```

## 🎯 Common Use Cases

### Testing New Features

1. Use `testuser` for quick login testing
2. Use new credentials for signup flow testing  
3. Monitor console logs for detailed debugging
4. Check localStorage for data persistence

### Demo Scenarios

1. **Parent Flow**: Use email signup → enter school code `SCHOOL123`
2. **Volunteer Flow**: Use phone signup → simple completion
3. **Existing User**: Try to signup with `testuser` → redirected to login

### Error Testing

1. **Wrong Code**: Enter anything other than `0000`
2. **Duplicate User**: Try to signup with existing credentials
3. **Invalid Input**: Test edge cases in input detection

---

*💡 Tip: Keep browser console open while testing to see detailed flow logs*
