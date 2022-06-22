function echo_type(parameter){
    console.log(typeof parameter)
    console.log((typeof parameter === typeof String() || typeof parameter == typeof Number()) ? parameter : 'Parameter is not suitable for printing' )
}

echo_type('Hello, JavaScript!')
echo_type(18)
echo_type(null)