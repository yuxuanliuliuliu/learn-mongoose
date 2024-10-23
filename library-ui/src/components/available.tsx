interface ShowStatusProps {
    handleContent: (type: string) => void;
  }
  
  export default function ShowStatus({ handleContent }: ShowStatusProps) {
    function handleShowStatus() {
      handleContent('available');
    }
  
    return (
      <button onClick={handleShowStatus}>Show Status</button>
    );
  }
  