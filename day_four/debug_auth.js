const BASE_URL = 'http://127.0.0.1:5001/api';

async function testAuth() {
  // 1. Signin to get token
  console.log('--- 1. Logging in to get token ---');
  const loginRes = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'newuser@example.com', password: 'password123' })
  });
  
  const loginData = await loginRes.json();
  const token = loginData.token;
  
  if (!token) {
    console.error('Failed to get token. Did you run the signup test previously?');
    // Try to signup if login fails
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Auth Test', email: 'newuser@example.com', password: 'password123' })
    });
    const signupData = await signupRes.json();
    console.log('Signup attempt result:', signupData);
    return;
  }
  console.log('Got token:', token.substring(0, 20) + '...');

  // 2. Try to create comment WITHOUT token
  console.log('\n--- 2. Request WITHOUT Token (Expected: Not authorized) ---');
  const failRes = await fetch(`${BASE_URL}/comments`, {
    method: 'GET' // comments endpoint is protected
  });
  console.log('Status:', failRes.status);
  console.log('Body:', await failRes.text());

  // 3. Try to create comment WITH token
  console.log('\n--- 3. Request WITH Token (Expected: Success/Empty Array) ---');
  const successRes = await fetch(`${BASE_URL}/comments`, {
    method: 'GET',
    headers: { 
        'Authorization': `Bearer ${token}` 
    }
  });
  console.log('Status:', successRes.status);
  console.log('Body:', await successRes.text());
}

testAuth();
