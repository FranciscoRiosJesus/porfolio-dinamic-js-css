const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('img-loaded'); 

    // listener category
    const link = document.querySelectorAll('#categories a');
    link.forEach( element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            link.forEach( link => link.classList.remove('active'));
            event.target.classList.add('active');

            const category = event.target.innerHTML.toLowerCase();
            category === 'all' ? grid.filter(`[data-category]`) : grid.filter(`[data-category="${category}"]`);
        });
    })

    // listener search
    document.querySelector('#search-bar').addEventListener('input', event => {
        const search = event.target.value;
        grid.filter( (item) => item.getElement().dataset.tag.includes(search) );1
    });

    // listener overlay
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( element => {

        element.addEventListener('click', () => {
            const rut = element.getAttribute('src');
            const description = element.parentNode.parentNode.dataset.description;
            
            overlay.classList.add('active');
            document.querySelector('#overlay img').src = rut;
            document.querySelector('#overlay .description').innerHTML = description;
        })

    });

    // close overlay 
    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', event => {
        //overlay.classList.remove('active');
        event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    })
});