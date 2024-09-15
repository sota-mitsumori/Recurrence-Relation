import math

def solve_recurrence(a, b, c, a1, a2):
    D = b**2 - 4*a*c

    if D > 0:
        x1 = (-b + math.sqrt(D)) / (2*a)
        x2 = (-b - math.sqrt(D)) / (2*a)

        A = ((x2*a1-a2) / (x2-x1))
        B = ((a2-x1*a1) / (x2-x1))

        return x1, x2, A, B

    elif D == 0:
        x = -b / (2*a)

        A = ((a2-x*a1) / x)
        B = a1
        return x, None, A, B
    
    else:
        return None, None, None, "imaginary not supported yet"

a = int(input("Enter the coefficient of a(n+2): "))
b = int(input("Enter the coefficient of a(n+1): "))
c = int(input("Enter the coefficient of a(n): "))

a1 = int(input("Enter the value of a1: "))
a2 = int(input("Enter the value of a2: "))

x1, x2, A, B = solve_recurrence(a, b, c, a1, a2)

if x1 is not None and x2 is not None:
    print(f"an = {A} * ({x1})^(n-1) + {B} * ({x2})^(n-1)")
elif x1 is not None:
    print(f"an = ({A} * (n-1) + {B}) * ({x1})^(n-1)")
else:
    "Imaginary roots are not supported yet"