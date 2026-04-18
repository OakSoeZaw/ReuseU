function WelcomePage({ onStart }){
  return (
      <div style={styles.container}>
          <h1 style={styles.title}>ReuseU</h1>

          <p style={styles.description}>
              ReuseU is a university donation platform that helps student
              pass items to the next person who needs them.
          </p>

          <button style={styles.button} onClick={onStart}>
              Go to Login
          </button>
      </div>
  );
}

const styles = {
    container: {
        hight: "100vh",
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "20px",
    },
    title: {
        fontSize: "48px",
        marginBottom: "20px",
    },
    description: {
        fontSize: "18px",
        maxWidth: "600px",
        lineHeight: "1.6",
        marginBottom: "30px",
    },
    button: {
        padding: "12px 24px",
        fontSize: "18px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2f6ed",
        color: "Green",
        cursor: "pointer",
    },
};

export default WelcomePage;