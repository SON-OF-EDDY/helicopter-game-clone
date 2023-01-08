from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from .models import Member
import re
from django.http import JsonResponse,HttpResponse

# Create your views here.


def post_scores(request):

    if request.method == 'POST':
    #
        score = request.POST['score']

        user_name = request.POST['user_name']

        members_list = Member.objects.all()

        for member in members_list:
            if member.name == user_name:
                if int(score) >= int(member.high_score):
                    member.high_score = int(score)
                    member.save()

        members_array = []

        for member in members_list:
            members_array.append([member.name,member.high_score])

        members_array.sort(key=lambda x: x[1], reverse=True)

        members_array = members_array[0:5]

        return JsonResponse({'members':members_array})

def index(request):

    if request.method == 'POST':

        new_game = False

        user_is_none = False
        password_is_none = False

        username = request.POST['username'].upper()

        if username == '':
            user_is_none = True

        password = request.POST['password']

        if password == '':
            password_is_none = True

        members_list = Member.objects.all()

        members_array = []

        for member in members_list:
            members_array.append([member.high_score,
                                  member.name,
                                  member.password])

        members_array.sort(key=lambda x: x[0], reverse=True)

        # get all the usernames and passwords
        #all_user_names = [[x[1],x[2]] for x in members_array]

        existing_user = False

        correct_password = False

        created_new = False

        current_score = -69

        for entry in members_array:

            if username == entry[1]:

                existing_user = True
                current_score = entry[0]

                if password == entry[2]:
                    correct_password = True
                break

        if not existing_user:

            if not user_is_none and not password_is_none:

                created_new = True
                m = Member(name=username.upper(), password=password, high_score=0)
                m.save()
                current_score = 0
                members_array.append([0,
                                      username.upper(),
                                      password])

        members_array.sort(key=lambda x: x[0], reverse=True)
        members_array = members_array[0:5]

        return render(request, 'index.html', {
            'new_game':new_game,
            'password_is_none':password_is_none,
            'user_is_none':user_is_none,
            'created_new':created_new,
            'current_score':current_score,
            'correct_password':correct_password,
            'current_user': username,
            'pass':password,
            'all_members': members_array,
        })

    else:

        new_game = True

        members_list = Member.objects.all()

        members_array = []

        for member in members_list:
            members_array.append([member.high_score,
                                  member.name,
                                  member.password])

        members_array.sort(key=lambda x:x[0],reverse=True)

        # then we take the top five from here...

        members_array = members_array[0:5]

        return render(request,'index.html',{
            'all_members':members_array,
            'new_game':new_game,
        })




