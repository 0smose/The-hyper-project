import {GameList} from './GameList'
const request = () => {
    document.querySelector('.request').addEventListener('keypress', (e) => {
        if (e.code == 'Enter') {
        searchGame();
        }
    });

    const searchGame = () => {
        let search = document.getElementById('findgame').value;
        return GameList(search);
    };
}

export { request }