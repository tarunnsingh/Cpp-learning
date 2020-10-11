#include <stdio.h>

int main()

{

    int m, n, result;
    printf("\nEnter the postion of Sonu from top: ");

    scanf("%d", &m);

    printf("\nEnter the postion of Sonu from bottom: ");

    scanf(" %d", &n);

    printf("\n");

    result = m + n - 1;

    printf("Number of students in the class : %d ", result);

    printf("\n");

    return 0;
}

