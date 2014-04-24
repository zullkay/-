from pyramid.view import view_config

@view_config(route_name='home', renderer='home.mak')
def home(request):
    settings = request.registry.settings
    #print(settings)
    #print(request)
    #print(request.scheme)
    return {'settings': settings}

