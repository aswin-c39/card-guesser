import back from './assets/back.jpg';
import './card.css'

function Card({card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
        }
        
    }

    return(
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt="card front" />
                <img className='back' 
                src={back}
                onClick={() => handleChoice(card)}
                />
            </div> 
        </div>
    );
}

export default Card;