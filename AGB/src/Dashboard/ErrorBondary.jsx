import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erreur capturée :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h2>Oups ! Il y a eu un problème </h2>
          <p>Veuillez recharger la page ou contacter le support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;