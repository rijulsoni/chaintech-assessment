import { useLocation, Link } from "react-router";

export default function User() {
  const location = useLocation();
  const userIndex = location.state?.index;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = userIndex !== undefined ? users[userIndex] : null;

  if (!user) {
    return (
      <p className="text-danger text-center mt-5">
        No user data found. Please log in.
      </p>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Details</h1>
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-header">Account Details</div>
        <div className="card-body">
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 6fr",
              gap: "10px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div className="fw-bold">Name:</div>
            <div>{user.name}</div>
            <div className="fw-bold">Email:</div>
            <div>{user.email}</div>
            <div className="fw-bold">City:</div>
            <div>{user.city}</div>
            <div className="fw-bold">Gender:</div>
            <div>{user.gender}</div>
            <div className="fw-bold">State:</div>
            <div>{user.state}</div>
            <div className="fw-bold">Zip:</div>
            <div>{user.zip}</div>
          </div>
          <div className="text-center">
            <Link to={`/edit/${userIndex}`} className="btn btn-primary">
              Edit Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
