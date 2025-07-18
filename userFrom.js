import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://vercel-git-main-ggggs-projects-6ab143ee.vercel.app/api/users',
        formData
      );
      alert('✅ Foydalanuvchi muvaffaqiyatli saqlandi!');
    } catch (error) {
      console.error('❌ Xatolik:', error);
      alert('Xatolik: foydalanuvchi saqlanmadi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Foydalanuvchi Qo‘shish</h2>
      
      <input type="text" name="firstName" placeholder="Ism" value={formData.firstName} onChange={handleChange} required />
      
      <input type="text" name="lastName" placeholder="Familya" value={formData.lastName} onChange={handleChange} required />
      
      <input type="text" name="phone" placeholder="Telefon raqam" value={formData.phone} onChange={handleChange} required />
      
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
      
      <button type="submit">Saqlash</button>
    </form>
  );
};

export default UserForm;
