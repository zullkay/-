from pyramid.view import view_config

@view_config(route_name='1home', renderer='1home.mak')
def index(request):
    settings = request.registry.settings
    #print(settings)
    #print(request)
    #print(request.scheme)
    return {'settings': settings}

