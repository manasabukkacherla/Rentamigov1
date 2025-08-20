interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const NextButton = ({ onClick, disabled = false }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="fixed bottom-8 right-8 px-8 py-3 text-black border-2 border-black rounded-lg"
    >
      Next
    </button>
  );
};

export default NextButton; 