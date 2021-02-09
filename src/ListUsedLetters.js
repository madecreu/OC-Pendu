const ListUsedLetters = ({usedLetters}) =>
    <div>
        <p data-testid='usedLetters'>
            {usedLetters.map((letter) => letter)}
        </p>
    </div>;

export default ListUsedLetters;