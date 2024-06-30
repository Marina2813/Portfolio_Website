"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; 
import gsap from "gsap";
import Navbar from "../common/Navbar";
import { useAuth } from "@/app/providers/context"; 
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebaseconfig"; 

const Page = () => {
  const overlayRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth(); 
  const [adminDoc, setAdminDoc] = useState([]); 

  // Function to fetch admin document from Firebase
  const fetchAdminDoc = async () => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (userEmail) {
      const docName = userEmail.split("@")[0]; 
      const docRef = doc(db, "users", docName); 
      const messagesCollectionRef = collection(docRef, "messages"); 

      // Fetch all documents from the 'messages' subcollection
      const querySnapshot = await getDocs(messagesCollectionRef);
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Messages: ", messages);
      setAdminDoc(messages); 
    }
  };

  // Function to delete a message from Firebase
  const deleteMessage = async (messageId) => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      const docName = userEmail.split("@")[0];
      const docRef = doc(db, "users", docName);
      const messageDocRef = doc(docRef, "messages", messageId);

      await deleteDoc(messageDocRef);
      // Remove the message from the state
      setAdminDoc((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); 
    } else {
      gsap.to(overlayRef.current, {
        y: "120%",
        duration: 1,
        ease: "power3.inOut",
      });
      fetchAdminDoc(); 
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; 

  return (
    <div className="relative">
      <div ref={overlayRef} className="fixed inset-4 bg-greenaccent z-50"></div>
      <Navbar />
      <div className="bg-greenbg min-h-[95vh] px-[100px] pt-40 overflow-hidden">
        {console.log("Admin Doc: ", adminDoc)}
        {adminDoc.length > 0 ? (
          adminDoc.map((message) => (
            <div
              key={message.id}
              className="message bg-white shadow-lg rounded-lg p-6 mb-5 transform transition-all hover:scale-105"
            >
              <p className="text-lg font-semibold">{message.name}</p>
              <p className="text-sm text-gray-500">{message.email}</p>
              <p className="mt-2 text-gray-700">{message.message}</p>
              <button
                onClick={() => deleteMessage(message.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          
          <p className="text-center text-gray-700">No messages to show</p>
        )}
      </div>
    </div>
  );
};

export default Page;
