
const QuestionPanel = ({ onClose }) => (
    <div style={{
      position: 'absolute',
      top: 100,
      left: 100,
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }}>
      <h3>Questions</h3>
      <ul>
        <li>What is your name?</li>
        <li>Where are you from?</li>
        <li>What do you want to do?</li>
      </ul>
      <button onClick={()=>onClose()}>Close</button>
    </div>
  )

  export default QuestionPanel;