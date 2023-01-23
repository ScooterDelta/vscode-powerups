import { FormEvent } from "react";
import styles from "../styles/Home.module.css";

export default function RabbitMQForm() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement;

    // Get data from the form.
    const data = {
      first: form.first.value as string,
      last: form.last.value as string,
    };

    // Send the form data to our API and get a response.
    const response = await fetch("/api/send-task", {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // The method is POST because we are sending data.
      method: "POST",
    });

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(
      `Job Number: '${result.data.jobNumber}', has been submitted with status: '${result.data.messageStatus}`
    );
  };
  return (
    <div className="container">
      <h1 className={styles.title}>Form to Submit Rabbit Message.</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="jobNumber">Job Number</label>
        <input type="text" id="jobNumber" name="jobNumber" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
