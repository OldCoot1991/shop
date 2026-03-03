const fetch = require('node-fetch');
async function test() {
  const res = await fetch('http://localhost:3000/api/v1/orders/registration', { // Note: this might be proxied or external API?
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([{ id: "1", quantity: 1 }])
  });
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}
test();
