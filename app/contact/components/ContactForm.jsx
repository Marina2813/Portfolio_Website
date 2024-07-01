import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { doc, collection,addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseconfig';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);

  const validateField = (name, value) => {
    let error = '';
    let success = '';

    if (name === 'name') {
      if (!value) {
        error = 'Name is required';
      } else if (!isValidName(value)) {
        error = 'Name is not valid';
      } else {
        success = 'Alright! Name is valid!';
      }
    }

    if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!isValidEmail(value)) {
        error = 'Email is not valid';
      } else {
        success = 'Email is valid!';
      }
    }

    if (name === 'message') {
      if (!value) {
        error = 'Message is required';
      } else {
        success = 'Just tap on the send message and it\'s done';
      }
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormSuccess((prevSuccess) => ({
      ...prevSuccess,
      [name]: success,
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const errors = {};
    const success = {};

    if (!name) {
      errors.name = 'Name is required';
    } else if (!isValidName(name)) {
      errors.name = 'Name is not valid';
    } else {
      success.name = 'Alright! Name is valid!';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Email is not valid';
    } else {
      success.email = 'Email is valid!';
    }

    if (!message) {
      errors.message = 'Message is required';
    } else {
      success.message = 'Just tap on the send message and it\'s done';
    }

    setFormErrors(errors);
    setFormSuccess(success);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reset play reset',
        },
      }
    );
    gsap.fromTo(
      leftDivRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftDivRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      rightDivRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightDivRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.in',
        onComplete: async () => {
          try {
            const userDocRef = doc(db, 'users', 'rohitbabugeorge');
            
            const messagesCollectionRef = collection(userDocRef, 'messages');
            
            // Adding the formData as a new document in the 'messages' subcollection
            const messageDocRef = await addDoc(messagesCollectionRef, formData);
            
            alert('Form submitted successfully!');
          } catch (error) {
            console.error("Error writing document: ", error);
            alert('Error submitting form. Please try again.');
          }
          gsap.to(formRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' });
          setFormData({ name: '', email: '', message: '' });
          setFormErrors({});
          setFormSuccess({});
        },
      });
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col md:flex-row w-full max-w-4xl  rounded-lg overflow-hidden ">
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-start " ref={leftDivRef}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Get in Touch</h2>
          <p className="mb-4 text-gray-700">Feel free to reach out to me via email or connect with me on social media.</p>
          <ul>
            <li className="mb-2">
              <strong>Email:</strong> <a href="mailto:your.email@example.com" className="text-blue-500">your.email@example.com</a>
            </li>
            <li className="mb-2">
              <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" className="text-blue-500">linkedin.com/in/yourprofile</a>
            </li>
            <li className="mb-2">
              <strong>GitHub:</strong> <a href="https://github.com/yourprofile" className="text-blue-500">github.com/yourprofile</a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 p-8" ref={rightDivRef}>
          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Me</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow appearance-none border-2 ${
                  formErrors.name ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700' : formSuccess.name ? 'border-green-500 bg-green-50 text-green-900 placeholder-green-700' : 'border-gray-300'
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.name && !formSuccess.name && <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oops!</span> {formErrors.name}</p>}
              {!formErrors.name && formSuccess.name && <p className="mt-2 text-sm text-green-600"><span className="font-medium">Alright!</span> {formSuccess.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`shadow appearance-none border-2 ${
                  formErrors.email ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700' : formSuccess.email ? 'border-green-500 bg-green-50 text-green-900 placeholder-green-700' : 'border-gray-300'
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.email && !formSuccess.email && <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oops!</span> {formErrors.email}</p>}
              {!formErrors.email && formSuccess.email && <p className="mt-2 text-sm text-green-600"><span className="font-medium">Alright!</span> {formSuccess.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`shadow appearance-none border-2 ${
                  formErrors.message ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700' : formSuccess.message ? 'border-green-500 bg-green-50 text-green-900 placeholder-green-700' : 'border-gray-300'
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {formErrors.message && !formSuccess.message && <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oops!</span> {formErrors.message}</p>}
              {!formErrors.message && formSuccess.message && <p className="mt-2 text-sm text-green-600"><span className="font-medium">Alright!</span> {formSuccess.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
