import main from './server';

main().then(app => {
    app.listen(3000,() => {
            console.log('listening to 3000');
    });
});
