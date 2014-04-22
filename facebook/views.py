from pyramid.view import view_config


@view_config(route_name='1home', renderer='1home.mak')
def my_view(request):
    return {'project': 'facebook'}

