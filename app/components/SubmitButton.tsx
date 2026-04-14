import buttonActiveImage from '../assets/button-active.png'
import buttonImage from '../assets/button.png'

const SubmitButton: React.FC = () => {
  return (
    <button type="submit" className="relative w-[292px] h-[78px]">
      <img
        src={buttonImage}
        alt=""
        className="absolute inset-0 w-full h-full"
      />
      <img
        src={buttonActiveImage}
        alt=""
        className="absolute inset-0 w-full h-full opacity-0 transition-opacity hover:opacity-100"
      />
    </button>
  )
}

export default SubmitButton
