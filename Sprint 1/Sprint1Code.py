usernames = ["sallysusan567@gmail.com", "marktooswaggy@hotmail.com", "cheyennetibdit@icloud.com"]
passwords = ["FireDragon432!", "HeatedCookie448*", "Ilovecmsc355"]

username_Index = -1 #variable to match password to username
usernameInput = input("Please enter a username \n")
passwordInput = "0"
correctPassword = "-1"
for name in usernames:
        if name == usernameInput:
            username_Index = usernames.index(usernameInput)
            correctPassword = passwords[username_Index]
            passwordInput = input("Please enter your password \n")
if username_Index == -1:
    print("That username does not exist, please try again")
if passwordInput == correctPassword:
     print("Successfully logged in! \n")
elif correctPassword == -1:
     print("That password was incorrect, try again \n")


    