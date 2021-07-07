from django import forms

class NameForm(forms.Form):
    your_fname = forms.CharField(label='Your First Name', max_length=100,
    widget= forms.TextInput(attrs={'id':'fName'}))
    your_lname = forms.CharField(label='Your Last Name', max_length=100,
        widget= forms.TextInput(attrs={'id':'lName'}))