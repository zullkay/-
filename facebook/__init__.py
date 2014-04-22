from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.add_static_view('static1', 'static/1', cache_max_age=3600)
    config.add_route('1home', '/1/')
    config.scan()
    return config.make_wsgi_app()
