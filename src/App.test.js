import randomWords from 'random-words';
import {render, fireEvent, screen} from '@testing-library/react'
import App from './App';

jest.mock('random-words');

const fireMultipleChanges = (items) => {
    for (let i = 0; i < items.length; i++) {
        fireEvent.change(screen.getByRole('textbox'), {target: {value: items[i]}})
    }
}

describe('<App />', () => {
    beforeEach(() => {
        randomWords.mockImplementationOnce(() => 'testing').mockImplementation(() => 'restarting');
        render(<App />);
    });

   describe('Initialization', () => {
      it ('should render a word', () => {
          expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('_______');
          expect(screen.getByTestId('usedLetters')).toBeEmptyDOMElement();
      });
   });

   describe('Actions', () => {
      it('should change word displayed', () => {
          fireEvent.change(screen.getByRole('textbox'), {target: {value: 'E'}});
          expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('_E_____');
          expect(screen.getByTestId('usedLetters')).toHaveTextContent(/^E$/);
          fireMultipleChanges(['T', 'S', 'I', 'N', 'G']);
          expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('TESTING');
          expect(screen.getByTestId('usedLetters')).toHaveTextContent(/^ETSING$/);
      });

      it('should display wrong letters', () => {
          fireEvent.change(screen.getByRole('textbox'), {target: {value: 'A'}});
          expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('_______');
          expect(screen.getByTestId('usedLetters')).toHaveTextContent(/^A$/);
      })

      it('should show restart button at the end', () => {
          expect(screen.queryByRole('button')).toBeNull();
          fireMultipleChanges(['T', 'E', 'S', 'I', 'N', 'G']);
          expect(screen.getByRole('button')).toHaveTextContent('Restart');
      });

      it('should restart game at the end', () => {
          fireMultipleChanges(['T', 'E', 'S', 'I', 'N', 'G']);
          fireEvent.click(screen.getByRole('button'));
          expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('__________');
          expect(screen.queryByRole('button')).toBeNull();
          expect(screen.getByTestId('usedLetters')).toBeEmptyDOMElement();
      });
   });

   describe('Snapshot', () => {
      it('should match with previous Snapshot', () => {
          fireMultipleChanges(['T', 'E', 'I', 'A', 'V']);
          expect(render(<App />).baseElement).toMatchSnapshot();
      });
   });
});