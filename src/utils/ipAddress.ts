export async function getPublicIpAddress(): Promise<string> {
  try {
    // Queries a secure, hyper-fast public JSON text endpoint
    const response = await fetch('https://ipify.org');
    const data = await response.json();
    return data.ip; // Returns something like "172.56.21.89"
  } catch (error) {
    console.log(error);
    // Fallback if the device loses connection or has strict offline states
    return '127.0.0.1';
  }
}
