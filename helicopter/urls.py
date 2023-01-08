from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('post_scores', views.post_scores, name='post_scores'),
]