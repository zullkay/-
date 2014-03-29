from pyramid.view import view_config


@view_config(route_name='home', renderer='test.mak')
def my_view(request):
    return {'project': 'facebook'}
