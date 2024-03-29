namespace dashboard.Server.Utils
{
    public static class ModelReflection
    {
        public static string[] GetPropertyNames(Type type)
        {
            return type.GetProperties().Select(prop => prop.Name).ToArray();
        }
    }
}
