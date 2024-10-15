"use client";

import { useState } from "react";
import styles from "./page.module.css"; // Assuming you have a CSS module for custom styling

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // Tracks upload status message

  // Upload all data
  async function uploadAll() {
    setIsLoading(true);
    setUploadStatus(""); // Reset status before starting upload

    const res = await fetch("/api/createMockData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "uploadAll" }),
    });

    const data = await res.json();

    if (res.ok) {
      setUploadStatus("All data uploaded successfully!"); // Mark as done if successful
    } else {
      console.log(data.error);
      setUploadStatus("Failed to upload all data."); // Mark as error if failed
    }

    setIsLoading(false);
  }

  // Upload only bookings data
  async function uploadBookings() {
    setIsLoading(true);
    setUploadStatus(""); // Reset status before starting upload

    const res = await fetch("/api/createMockData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "uploadBookings" }),
    });

    const data = await res.json();

    if (res.ok) {
      setUploadStatus("Bookings uploaded successfully!"); // Mark as done if successful
    } else {
      console.log(data.error);
      setUploadStatus("Failed to upload bookings."); // Mark as error if failed
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>SAMPLE DATA</h3>

      <button
        onClick={uploadAll}
        disabled={isLoading}
        className={`${styles.button} ${
          uploadStatus === "All data uploaded successfully!"
            ? styles.success
            : ""
        }`}
      >
        {isLoading ? "Uploading..." : "Upload ALL"}
      </button>

      <button
        onClick={uploadBookings}
        disabled={isLoading}
        className={`${styles.button} ${
          uploadStatus === "Bookings uploaded successfully!"
            ? styles.success
            : ""
        }`}
      >
        {isLoading ? "Uploading..." : "Upload bookings ONLY"}
      </button>

      {/* Display upload status message */}
      {uploadStatus && (
        <p
          className={
            uploadStatus.includes("Failed")
              ? styles.errorMessage
              : styles.successMessage
          }
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
}

export default Page;
