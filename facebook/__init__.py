from pyramid.config import Configurator


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/1/')
    config.scan()
    #config.appid = settings['facebook.appid']
    return config.make_wsgi_app()
