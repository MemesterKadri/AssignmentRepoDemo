usernames = ["sallysusan567@gmail.com", "marktooswaggy@hotmail.com", "cheyennetibdit@icloud.com"]
passwords = ["FireDragon432!", "HeatedCookie448*", "Ilovecmsc355"]

username_Index = -1 #variable to match password to username
password_Index = -1 #variable to match password to username
usernameInput = input("Please enter a username \n")
for name in usernames:
        if name == usernameInput:
            username_Index = usernames.index(usernameInput)
            print("Please enter your password")
if username_Index == -1:
    print("That username does not exist, please try again")
        


    