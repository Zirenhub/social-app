function LogIn() {
  return (
    <div className="flex flex-col">
      <label>Email</label>
      <input type="text" className="input-auth" />
      <label>Password</label>
      <input type="text" className="input-auth" />
      <button className="btn-submit">Log In</button>
    </div>
  );
}

export default LogIn;
