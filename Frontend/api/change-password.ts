import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, newPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    try {
      const response = await fetch('http://localhost:8080/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
