import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    ism: '',
    familya: '',
    ochistva: '',
    telefon: ''
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
      await axios.post('https://vercel-lymf.vercel.app/api/users', formData);
      alert('✅ Maʼlumot saqlandi!');
      setFormData({ ism: '', familya: '', ochistva: '', telefon: '' });
    } catch (error) {
      alert('❌ Xatolik: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '30px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Foydalanuvchi qo‘shish</h2>
      <input type="text" name="ism" placeholder="Ism" value={formData.ism} onChange={handleChange} required />
      <input type="text" name="familya" placeholder="Familya" value={formData.familya} onChange={handleChange} required />
      <input type="text" name="ochistva" placeholder="Ochistva" value={formData.ochistva} onChange={handleChange} required />
      <input type="text" name="telefon" placeholder="Telefon" value={formData.telefon} onChange={handleChange} required />
      <button type="submit">Saqlash</button>
    </form>
  );
};

export default UserForm;