# REACH Platform Documentation

Welcome to the REACH Hong Kong platform documentation. This directory contains technical documentation for developers working on the platform.

## Documentation Index

### Authentication System
- [📚 **AUTH_SYSTEM.md**](./AUTH_SYSTEM.md) - Complete authentication system documentation
- [🔧 **AUTH_QUICK_REFERENCE.md**](./AUTH_QUICK_REFERENCE.md) - Quick reference for testing and debugging

## Quick Start

### Testing Authentication

**Default Test Users:**
```
Username: testuser     | Password: test123
Email: test@example.com | Password: test123  
Phone: 12345678        | Password: phone123
```

**Test Values:**
- Verification Code: `0000`
- School Code: `SCHOOL123`

### Debug Console

```javascript
// View stored users
JSON.parse(localStorage.getItem('mock_users'))

// View current session  
JSON.parse(localStorage.getItem('auth_user'))
```

## Development Guidelines

1. **Check Console Logs**: All auth operations are logged with emoji prefixes
2. **Use Test Credentials**: Consistent testing with provided accounts
3. **Monitor localStorage**: User data persists across sessions
4. **Follow Flows**: Multi-step processes are clearly documented

## Contributing

When making changes to the authentication system:

1. Update relevant documentation
2. Test all user flows
3. Verify localStorage persistence
4. Check console logging output
5. Update test credentials if needed

---

For detailed technical information, see the individual documentation files.
