/* eslint-disable no-unused-vars */
export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    
   

    // Calculate new positions
    let offsetLeft = card.offsetLeft + mouseMoveDir.x;
    let offsetTop = card.offsetTop + mouseMoveDir.y;

    // Ensure the card doesn't move outside the left edge of the screen
    if (offsetLeft < 0) {
        offsetLeft = 0;
    }

    // Ensure the card doesn't move outside the right edge of the screen
    if (offsetLeft + cardWidth > screenWidth) {
        offsetLeft = screenWidth - cardWidth;
    }

    // Ensure the card doesn't move outside the top edge of the screen
    if (offsetTop < 0) {
        offsetTop = 0;
    }

    // Ensure the card doesn't move outside the bottom edge of the screen
    if (offsetTop + cardHeight > screenHeight) {
        offsetTop = screenHeight - cardHeight;
    }

    // //console.table(offsetLeft,offsetTop)
    // console.log(card.offsetLeft);


    return {
        x: offsetLeft,
        y: offsetTop,
    };
};


export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }


export const setZindex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if(card !== selectedCard){
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    })
}  

export const bodyParser = (value) => {
    try{
        JSON.parse(value);
        return JSON.parse(value);
    }catch(err){
        return value;
    }
} 