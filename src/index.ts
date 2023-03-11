import main from './server';

main().then(app => {
    app.listen(3000,() => {
            console.log('app running on 3000');
    });
});
