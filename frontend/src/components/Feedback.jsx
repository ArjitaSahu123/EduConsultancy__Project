import React from 'react';
import Nav from './Utilities/Nav';
import { getUserId, sendFeedbackMessage } from '../services/feedback-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  feedback: z.string().min(1, 'Feedback is required'),
});


const Feedback = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSendFeedback = async (data) => {
    try {
      const { name, email, phone, feedback } = data;
      const userId = await getUserId();

      const feedbackData = {
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        message: feedback,
      };

      await sendFeedbackMessage(feedbackData);

      reset();
      toast.success('Feedback sent successfully!');
    } catch (error) {
      console.error('Error in sending feedback:', error);
      toast.error('Failed to send feedback. Please try again later.');
    }
  };

  return (
    <div className='max-w-7xl h-screen mx-auto flex flex-col'>
      <Nav />
      <div className='max-w-7xl h-screen mx-auto flex flex-col items-center'>
        <div className='w-3/4'>
          <div className='font-semibold text-2xl mt-10'>Feedback</div>
          <div className='leading-loose'>
            We value your thoughts! Your feedback helps us improve and deliver better solutions tailored to your needs. Share your experience with us – we’re here to listen and grow together.
          </div>

          <div className='mt-10'>
            <form className="flex flex-col" onSubmit={handleSubmit(handleSendFeedback)}>
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
                  <div><label htmlFor="phone" className="font-semibold text-sm">Phone</label></div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone number"
                      className={`p-2 rounded-lg text-sm bg-lightblue w-72 inputborder ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              <div><label htmlFor="feedback" className="font-semibold text-sm">Feedback</label></div>
              <div className="mb-4">
                <textarea
                  id="feedback"
                  placeholder="Your feedback"
                  className={`p-2 rounded-lg text-sm bg-lightblue w-full h-48 inputborder ${errors.feedback ? 'border-red-500' : ''}`}
                  {...register('feedback')}
                />
                {errors.feedback && <p className="text-red-500 text-xs">{errors.feedback.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-dark text-white flex justify-center items-center p-3 rounded-xl w-[30%] btnhover"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

