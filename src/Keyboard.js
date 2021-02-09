const Keyboard = ({handleTry}) => {
    const handleFocus = (event) => event.currentTarget.focus();

    return (
        <div>
            <input type="text" value='' onChange={handleTry} onBlur={handleFocus} autoFocus />
        </div>
    );
};

export default Keyboard