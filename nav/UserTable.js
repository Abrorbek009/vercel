import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Foydalanuvchilarni olish
    axios.get('https://vercel-git-main-ggggs-projects-6ab143ee.vercel.app/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Xatolik:', err));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>Foydalanuvchilar ro‘yxati</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#007bff', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Ism</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Familya</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Telefon</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Tug‘ilgan sana</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{user.firstName || user.ism}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{user.lastName || user.familya}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{user.phone || user.telefon}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{user.birthDate || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;