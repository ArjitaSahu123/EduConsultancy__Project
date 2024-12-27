import React from 'react';
import Nav from './Utilities/Nav';
import { getUserId, sendContactMessage } from '../services/contact-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSendMessage = async (data) => {
    try {
      const { name, email, subject, message } = data;
      const userId = await getUserId();

      const messageData = {
        userId: userId,
        name: name,
        email: email,
        subject: subject,
        message: message,
      };

      await sendContactMessage(messageData);

      reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error in sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className='max-w-7xl h-screen mx-auto flex flex-col'>
      <Nav />
      <div className='max-w-7xl h-screen mx-auto flex flex-col items-center'>
        <div className='w-3/4'>
          <div className='font-semibold text-2xl mt-10'>Contact</div>
          <div className='leading-loose'>
            Get in touch with us to explore how we can support your institution's growth and success.
            Reach out today for personalized consultancy services tailored to your needs.
          </div>

          <div className='mt-10'>
            <form className="flex flex-col" onSubmit={handleSubmit(handleSendMessage)}>
              <div className='flex justify-between items-center'>
                <div>
                  <div><label htmlFor="name" className="font-semibold text-sm">Name</label></div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      className={`p-2 rounded-lg text-sm bg-lightblue w-72 inputborder ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                </div>
                <div>
                  <div><label htmlFor="email" className="font-semibold text-sm">Email</label></div>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      placeholder="Example@gmail.com"
                      className={`p-2 rounded-lg text-sm bg-lightblue w-72 inputborder ${errors.email ? 'border-red-500' : ''}`}
                      {...register('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <div><label htmlFor="subject" className="font-semibold text-sm">Subject</label></div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="subject"
                      placeholder="Your subject"
                      className={`p-2 rounded-lg text-sm bg-lightblue w-72 inputborder ${errors.subject ? 'border-red-500' : ''}`}
                      {...register('subject')}
                    />
                    {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                  </div>
                </div>
              </div>

              <div><label htmlFor="message" className="font-semibold text-sm">Message</label></div>
              <div className="mb-4">
                <textarea
                  id="message"
                  placeholder="Your message"
                  className={`p-2 rounded-lg text-sm bg-lightblue w-full h-48 inputborder ${errors.message ? 'border-red-500' : ''}`}
                  {...register('message')}
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-dark text-white flex justify-center items-center p-3 rounded-xl w-[30%] btnhover"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
