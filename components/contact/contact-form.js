import { useRef, useState, useEffect } from "react";

import Notification from "../../ui/notification";
import classes from "./contact-form.module.css";

function ContactForm() {
  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const messageInput = useRef(null);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactData(contactdata) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }

  async function sendMessageHandler(event) {
    event.preventDefault();

    const emailInputValue = emailInput.current.value;
    const nameInputValue = nameInput.current.value;
    const messageInputValue = messageInput.current.value;

    const reqBody = {
      email: emailInputValue,
      name: nameInputValue,
      message: messageInputValue,
    };

    setRequestStatus("pending");

    try {
      await sendContactData(reqBody);
      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInput} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInput} required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="5" ref={messageInput} />
        </div>

        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
