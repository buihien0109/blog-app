import React from 'react';
import { Helmet } from 'react-helmet';
import avatar from '../../assets/auth-image.jpg';

function About() {
  return (
    <>
      <Helmet>
        <title>Về tác giả</title>
      </Helmet>
      <div className="max-w-6xl mx-auto py-7">
        <h2 className="mb-5 text-2xl font-semibold">Giới thiệu bản thân</h2>
        <p className='text-gray-500 my-2'>Hi there 👋</p>

        <p className='my-2'>Cảm ơn bạn đã ghé thăm blog của mình, một blog về công nghệ (chủ yếu là lập trình), nhưng cũng có thể có nhiều bài viết linh tinh nhảm nhí tùy tâm trạng.</p>

        <p className='my-2'>Hy vọng các bài viết ở đây sẽ giúp phần nào cho công việc của các bạn (nếu bạn là lập trình viên), hoặc ít nhất nó cũng giúp bạn giải trí sau những giờ làm việc căng thẳng 😎.</p>

        <img src={avatar} alt='Bùi Hiên' className='w-1/2 block my-2' />

        <p className='my-2'>Have fun!</p>
      </div>
    </>
  )
}

export default About